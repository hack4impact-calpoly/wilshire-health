import "./ItemCard.css";
import TagsList from "./TagsList";

interface ItemCardProps {
  itemName: string;
  date: Date;
  money: number;
  tags: string[];
}

export default function ItemCard({
  itemName,
  date,
  money,
  tags,
}: ItemCardProps) {
  return (
    <div className="item-card">
      <div className="item-card-imgbox" />
      <div className="item-card-info">
        <div className="item-titlebox">
          <div className="item-card-name">{itemName}</div>
          <div className="item-card-date">
            {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
        <div className="item-card-price">${money.toFixed(2)}</div>
        <div className="item-card-tags">
          <TagsList categories={tags} />
        </div>
      </div>
    </div>
  );
}
