const GameHeader = ({ attemptsLeft }) => { // заголовок
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-2">Вгадайка</h1>
      <p className="text-white/80">Відкриваючи картки, склади комбінацію з трьох однакових картинок, щоб отримати винагороду.</p>
      <div className="mt-2 text-white font-semibold">
        Спроб залишилось: <span className='text-green-400'>{attemptsLeft}</span>
      </div>
    </div>
  );
};

export default GameHeader;