import * as React from 'react'

export type AsyncStatus = 'idle' | 'resolved' | 'rejected' | 'pending'

type InputActions = {
  onSuccess?: (data: any) => void
  onError?: () => void
}
type AsyncBody = {
  status: AsyncStatus
  data: any | undefined
  error: any | undefined
}

function useSafeDispatch(dispatch: any) {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch]
  )
}

const defaultInitialState: AsyncBody = {
  status: 'idle',
  data: undefined,
  error: undefined,
}

export function useAsync(initialState?: InputActions) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{ status, data, error }, setState] = React.useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialStateRef.current
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data) => safeSetState({ data, status: 'resolved' }),
    [safeSetState]
  )
  const setError = React.useCallback(
    (error) => safeSetState({ error, status: 'rejected' }),
    [safeSetState]
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  )

  const run = React.useCallback(
    async (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      safeSetState({ status: 'pending' })
      try {
        const data = await promise
        setData(data)
        initialState?.onSuccess?.(data)
        return data
      } catch (error) {
        const errorMsg =
          typeof error === 'object' ? JSON.stringify(error) : error
        setError(errorMsg)
        initialState?.onError?.()
        return Promise.reject(error)
      }
    },
    [safeSetState, setData, setError]
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}
