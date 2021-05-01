const Comment = {
  _id: 'ObjectId()',
  author: 'ObjectId',
  content: 'string',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  deleted: 'boolean',
}
const Reaction = {
  _id: 'ObjectId()',
  author: 'ObjectId',
  type: 'string',
  createdAt: 'timestamp',
}
const Post = {
  _id: 'ObjectId()',
  title: 'string',
  short_description: 'string',
  content: 'string',
  comments: '[Comment()]',
  reactions: '[Reaction()]',
  author: 'ObjectId',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  deleted: 'boolean',
}
const User = {
  _id: 'ObjectId()',
  name: 'string',
  document: 'string',
  birthdate: 'date',
  posts: '[Post]',
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  deleted: 'boolean',
}

/*
  Um usuário pode criar Post/Comment/Reaction e editar apenas o seu próprio conteúdo
  Um usuário não pode visualisar birthdate e document de nenhum outro usuário
  Comments e reactions são sub-coleções de posts
  User e Posts são coleções próprias
  CRUD Usuário
  CRUD Post
  CRUD Comentário
  CRUD Reaction
*/
