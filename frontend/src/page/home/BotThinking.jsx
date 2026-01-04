const BotThinking = () => {
  return (
    <div className="self-start pb-5">
      <div className="px-4 py-3 rounded-md bg-neutral-200 w-fit">
        <div style={styles.container}>
          <span style={{ ...styles.dot, animationDelay: '0s' }} />
          <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
          <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
        </div>
      </div>

      <style>
        {`
          @keyframes botThinking {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.3;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#525252',
    animation: 'botThinking 1.4s infinite ease-in-out both'
  }
}

export default BotThinking;