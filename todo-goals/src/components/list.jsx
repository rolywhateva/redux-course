export function List(props) {
    return (
      <ul>
        {props.items.map((item, key) => (
          <li key={key}>
            <span
              onClick={() => props.onClick && props.onClick(item)}
              style={{ textDecoration: item.complete ? "line-through" : "none" }}
            >
              {item.name}
            </span>
  
            <button
              onClick={() => {
                props.remove(item);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    );
  }