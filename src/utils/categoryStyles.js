export const getCategoryClass = (category) => {
    switch(category) {
      case "Thriller": return "category-thriller";
      case "Selfhelp": return "category-selfhelp";
      case "Simple": return "category-simple";
      case "Fantasy": return "category-fiction";
      default: return "category-default";
    }
  };
