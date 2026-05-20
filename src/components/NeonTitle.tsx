type NeonTitleProps = {
  titleId: string;
};

export function NeonTitle({ titleId }: NeonTitleProps) {
  return (
    <h1 className="neonTitleWrap">
      <span id={titleId} className="sr-only">
        GREIČIO RATAI &rsquo;26
      </span>
      <object
        className="neonLogo"
        data="/greicio-ratai-logo.svg"
        type="image/svg+xml"
        width={1440}
        height={600}
        aria-hidden
      >
        GREIČIO RATAI &rsquo;26
      </object>
    </h1>
  );
}
