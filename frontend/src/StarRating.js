import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

const StarRateWrap = styled.div`
        display: flex;
        align-items: center;
        width: 90px;
        margin-bottom: 6px;
        .star_icon {
          display: inline-flex;
          margin-right: 5px;
        }
`;

function StarRating({value}) {

    // const { id } = useParams();

    // const [product, setProduct] = useState(0);

    // const getProduct = async () => {
    //     const json = await (
    //       await fetch(`http://localhost:8000/results/${id}`)
    //     ).json();
    //     console.log("자 이제 시작")
    //     setProduct(json.rating.toFixed(1))
    //     console.log("바꾸기 전", json.rating.toFixed(1))
    //   };
    // useEffect(() => {
    // getProduct();
    // }, []);
    // console.log("바뀌었나?", product)

    const AVR_RATE = value;
    console.log("얏호", AVR_RATE);
    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 70) / 5;
        let idx = 0;
        while (starVerScore > 14) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };
    useEffect(() => {
        setRatesResArr(calcStarRates)
    }, [])

    return (
        <>
            <GlobalStyle />
            <StarRateWrap>
            {STAR_IDX_ARR.map((item, idx) => {
                return <span className='star_icon' key={`${item}_${idx}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 14 13' fill='#cacaca'>
                        <clipPath id={`${item}StarClip`}>
                            <rect width={`${ratesResArr[idx]}`} height='39' />
                        </clipPath>
                        <path
                            id={`${item}Star`}
                            d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                            transform='translate(-2 -2)'
                        />
                        <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#ffd400'
                        />
                    </svg>
                </span>
            })
            }
        </StarRateWrap>

        </>
    );
}

export default StarRating;
