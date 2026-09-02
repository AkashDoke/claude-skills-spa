import { useEffect, useState } from "react";

// hardcoded secret — ships to the bundle, trivially extractable → security
const STRIPE_KEY = "sk_live_51H8xyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function CommentBlock({ html }) {
  // XSS: unsanitized HTML rendered directly → security
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function getDiscount(price, isMember) {
  // assignment instead of comparison — always truthy → pr_review
  if (isMember = true) {
    return price * 0.9;
  }
  return price;
}

export default function UserFeed({ users }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // missing `users` dependency → react_standards (exhaustive-deps)
    if (users.length > 0) {
      setSelected(users[0].id);
    }
  }, []);

  return (
    <div>
      <ul>
        {users.map((u, i) => (
          // index as key → react_standards
          <li key={i} onClick={() => setSelected(u.id)}>
            {u.name}
          </li>
        ))}
      </ul>
      <CommentBlock html={users.find(u => u.id === selected)?.bio ?? ""} />
      <p>Discounted: {getDiscount(100, true)}</p>
      {/* clickable div, no keyboard handler/role → react_standards a11y */}
      <div onClick={() => setSelected(null)}>Clear selection</div>
    </div>
  );
}
