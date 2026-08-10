export function addNotification(notification) {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const newNotification = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    read: false,
    ...notification,
  };

  const updatedNotifications = [
    newNotification,
    ...notifications,
  ];

  localStorage.setItem(
    "notifications",
    JSON.stringify(updatedNotifications)
  );

  // Notify Navbar/Notifications component immediately
  window.dispatchEvent(new Event("notificationsUpdated"));
}