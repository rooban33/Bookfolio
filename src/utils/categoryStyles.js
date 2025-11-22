export const getCategoryClass = (category) => {
    switch(category) {
      case "Thriller": return "category-thriller";
      case "Selfhelp": return "category-selfhelp";
      case "Simple": return "category-simple";
      case "Fiction": return "category-fiction";
      default: return "category-default";
    }
  };