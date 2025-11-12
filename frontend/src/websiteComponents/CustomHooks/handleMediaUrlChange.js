export const handleMediaUrlChange = (index, value,setMediaUrls) => {
    setMediaUrls(prev =>
      prev.map((url, i) => (i === index ? value : url))
    );
  };