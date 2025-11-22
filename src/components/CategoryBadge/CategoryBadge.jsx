import { getCategoryClass } from '../../utils/categoryStyles';
import './CategoryBadge.css';

export default function CategoryBadge({ category }) {
  return (
    <span className={`category-badge ${getCategoryClass(category)}`}>
      {category}
    </span>
  );
}