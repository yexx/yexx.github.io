export function getFiletype(filename) {
  const imgTypes = ['jpg', 'jpeg', 'png', 'webp'];
  const videoTypes = ['mp4', 'mkv', 'mov'];
  const filetype = filename.split('.').pop();

  if(imgTypes.indexOf(filetype) != -1) return 'image';
  if(videoTypes.indexOf(filetype) != -1) return 'video';
}
