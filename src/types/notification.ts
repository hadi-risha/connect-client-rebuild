export interface INotification {
  _id: string;
  title: string;
  content: string;
  isVisible: boolean;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}