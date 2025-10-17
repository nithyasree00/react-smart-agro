import React from "react";

const NotificationList = ({ notifications }) => {
  if (!notifications.length) return <p>No notifications yet</p>;

  return (
    <ul>
      {notifications.map((n, i) => (
        <li key={i}>{n.message}</li>
      ))}
    </ul>
  );
};

export default NotificationList;
