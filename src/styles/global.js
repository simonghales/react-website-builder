import { injectGlobal } from 'emotion';
import reset from './reset';
import colors from './utils/colors';
import fontFamilies from './utils/fontFamilies';

export default injectGlobal`
    ${reset};
    
    * {
        box-sizing: border-box;
    }
    
    body {
        ${fontFamilies.body};
        background-color: ${colors.siteBackground};
        font-size: 15px;
        line-height: 1;
    }
    
    img {
        max-width: 100%;
        max-height: 100%;
    }
    
    strong {
        font-weight: 900;
    }
    
`;
