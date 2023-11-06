import fetchWithRefresh from "./fetchWithRefresh"

export const notificationVisualized = async (notification_id:number) => {

    const token = localStorage.getItem('access_token');
    const response = await fetchWithRefresh(`http://${window.location.hostname}/notification/notification/${notification_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

}