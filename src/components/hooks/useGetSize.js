export default function useGetSize(container) {
  const element = document.getElementById(container);
  if (!element) return { width: 0, height: 0 };
  const { innerWidth, innerHeight } = window;
  function convertWidth(width) {
    return (100 * width) / innerWidth;
  }
  function convertHeight(height) {
    return (100 * height) / innerHeight;
  }
  const width = convertWidth(element.offsetWidth);
  const height = convertHeight(element.offsetHeight);

  return {
    width,
    height,
  };
}
