const { createClient } = require('webdav');

exports.main = async (event) => {
  const client = createClient(
    event.webdavurl,
    {
      username: event.username,
      password: event.password,
    },
  );

  if (event.type === 'folder') {
    const data = await client.getDirectoryContents(event.path);
    return { data };
  }
  if (event.type === 'file') {
    const buff = await client.getFileContents(event.path);
    return { buff };
  }

  return '';
};
