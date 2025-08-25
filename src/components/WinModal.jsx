const WinModal = ({ isVisible, onNewGame }) => { // модалка про перемогу
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Вітаємо!</h3>
          <p className="text-gray-700 mb-4">Ви знайшли всі правильні карточки!</p>
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-4 rounded-xl mb-4 font-bold">
            🎁 Ви виграли 100 бонусів!
          </div>
          <p className="text-gray-600 text-sm">
            Приходьте наступного місяця за новими призами!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinModal;