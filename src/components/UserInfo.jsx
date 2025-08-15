const UserInfo = ({ userId }) => {
  return (
    <div className="text-center text-white/60 text-xs">
      <div className="bg-white/5 rounded-lg p-3">
        <p>Telegram ID: {userId}</p>
        <p>У кожній спробі можна вибрати тільки 3 карточки</p>
        <p>Спроби оновлюються щомісяця</p>
      </div>
    </div>
  );
};

export default UserInfo;