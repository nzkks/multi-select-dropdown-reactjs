type Props = {
  user: { id: number; image: string; firstName: string; lastName: string };
  className?: string;
};
const UserOption = ({ user, className }: Props) => {
  const userName = `${user.firstName} ${user.lastName}`;
  return (
    <div className={`flex gap-2 userOption ${className}`}>
      <img src={user.image} alt={userName} />
      <div>{userName}</div>
    </div>
  );
};

export default UserOption;
