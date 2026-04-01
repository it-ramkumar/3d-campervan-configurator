export const removeMediaUrl = (index,mediaUrls,setMediaUrls) => {
    if (mediaUrls.length > 1) {
      setMediaUrls(prev => prev.filter((_, i) => i !== index));
    } else {

      setMediaUrls([""]);
    }
  };
