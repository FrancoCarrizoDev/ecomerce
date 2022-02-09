import styled from "styled-components"

export const ImageAndHoverImage = ({ background, hoverBackground }) => {
  const Img = styled.img`
    background: ${(props) => `url(${props.background}) no-repeat  center`};
    background-size: cover;
    -webkit-animation: fadeinTwo 0.5s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeinTwo 0.5s; /* Firefox < 16 */
    -ms-animation: fadeinTwo 0.5s; /* Internet Explorer */
    -o-animation: fadeinTwo 0.5s; /* Opera < 12.1 */
    animation: fadeinTwo 0.5s;
    &:hover {
      -webkit-animation: fadein 0.5s; /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadein 0.5s; /* Firefox < 16 */
      -ms-animation: fadein 0.5s; /* Internet Explorer */
      -o-animation: fadein 0.5s; /* Opera < 12.1 */
      animation: fadein 0.5s;
      background: ${(props) =>
        `url(${props.hoverBackground}) no-repeat  center`};
      background-size: cover;
    }
  `

  return (
    <Img
      background={background}
      hoverBackground={hoverBackground}
      className="logoContent card-img-top"
    />
  )
}
