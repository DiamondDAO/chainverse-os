export const GET_ENTITY_SEARCH_STRING = `
CALL
	db.index.fulltext.queryNodes("entSearch", $QUERY)
YIELD
	node, score
MATCH
	(node)
OPTIONAL MATCH
	(node)-[r:TRUST]-(trusted)
OPTIONAL MATCH
	(node)-[r1:AFFILIATE]-(affiliate)
OPTIONAL MATCH
	(node)-[:REFERENCE_IN|AUTHOR|PUBLISHED]-(article:Article)
WITH
	node, node.uuid as uuid, node.name as name, count(distinct(trusted)) as trusted, count(distinct(affiliate)) as affiliates, count(distinct(article)) as articles, score, labels(node) as labels
MATCH
	(node)
WITH
	collect({
  uuid: node.uuid,
  name: node.name,
  trust_network: trusted,
  interest_network: affiliates,
  related_documents: articles,
  score: score,
  labels: labels,
  result_type: 'entity_match'
  }) 
	as entity_matches
with
	entity_matches, size(entity_matches) as total_entity
RETURN
{
entity_matches: entity_matches,
total_entity: total_entity
} as matches
UNION
CALL
db.index.fulltext.queryNodes("textSearch", $QUERY)
YIELD
  node, score
MATCH
  (node)
OPTIONAL MATCH
  (node)-[:REFERENCES|AUTHOR|PUBLISHED|SPONSORED|HAS_PROPOSAL]-(thing)
WITH
  node, node.uuid as uuid, node.title as title, count(distinct(thing)) as related_entities, score, [x in labels(node) where x in ['Proposal', 'Note', 'Article']] as labels, count(distinct(node)) as total_documents
MATCH
  (node)
WITH
  collect({
  uuid: node.uuid,
  title: node.title,
  score: score,
  labels: labels,
  related_entities:related_entities,
  result_type: 'document_match'
  }) as document_matches
with document_matches, size(document_matches) as total_documents
RETURN
{
  document_matches: document_matches,
  total_documents: total_documents
}
AS
matches
`

export const GET_ENTITY_GRAPH_BY_UUID =  `
match (e:Entity {uuid:$UUID}) with e
  call apoc.path.expandConfig(e,
                              { 
                                  minLevel: 1, 
                                  maxLevel: 2,
                                  relationshipFilter: 'TRUST',
                                  labelFilter: '/Entity'
                              }
                             )
                              yield path 
  with relationships(path) as rels, nodes(path) as noodles
  unwind rels as r
  unwind noodles as noods
  with r, noods
  with type(r) as type, startNode(r) as source,  endNode(r) as target, r, noods.uuid as uuid, noods.name as name
  return collect(distinct({uuid: uuid, name: name})) as nodes, collect(distinct({source: source.uuid, target: target.uuid, traversalType: type, type: r.relType})) as links
`

export const GET_PERSON_GRAPH_BY_UUID = `
match (Person {uuid:$UUID}) with e
call apoc.path.expandConfig(e,
                            { 
                                minLevel: 1, 
                                maxLevel: 2,
                                relationshipFilter: 'TRUST,TRUST',
                                labelFilter: '/Entity'
                            }
                           )
                            yield path 
with relationships(path) as rels, nodes(path) as noodles
unwind rels as r
unwind noodles as noods
with r, noods
with type(r) as type, startNode(r) as source,  endNode(r) as target, r, noods.uuid as uuid, noods.name as name
return collect(distinct({traversalType: type, type: r.relType,  source: source.uuid, target: target.uuid})) as relationships, collect(distinct({uuid: uuid, name: name})) as nodes
`