/**
 * Composant d'arrière-plan avec effet de flou
 * @component
 * @returns {JSX.Element} Composant BlurBackground avec un dégradé vert flouté
 */
export default function BlurBackground() {
  return (
    <div className="absolute left-0 top-96 z-0 blur-3xl w-full">
      <div
        className="aspect-[16/9] w-full bg-green-9 opacity-10"
        style={{
          clipPath: 'polygon(8% 0, 94% 0, 94% 100%, 8% 100%)'
        }}
      ></div>
    </div>
  );
}
