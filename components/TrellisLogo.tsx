interface Props {
  height?: number;
  className?: string;
}

export default function TrellisLogo({ height = 32, className }: Props) {
  const width = Math.round((256 / 48) * height);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/trellis-logo-dark.svg"
      alt="Trellis Digital"
      width={width}
      height={height}
      className={className}
      draggable={false}
    />
  );
}
