const idValidator = require('./validators/id.js');
const postRepository = require('../repository/post.js');

exports.findPostById = async function (path, ...ignore) {
  const id = path.split('/')[2].toLowerCase();
  if (!idValidator.validObjectId(id)) {
    return {code: 400, body: {message: 'Invalid parameters' }};
  }
  return postRepository.findPostById(id)
    .then(async (result) => {
      if (result) {
        return {code: 200, body: result}
      }
      return {code: 404, body: {message: 'Post not found'}}
    }).catch((error) => {
      console.log('##### Exception caught at findPostById: #####');
      console.log(error);
      return {code: 500, body: {message: 'Internal Server Error'}};
    })
};
