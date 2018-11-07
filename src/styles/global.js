import { injectGlobal } from 'emotion';
import reset from './reset';

export default injectGlobal`
    ${reset};
    
    * {
        box-sizing: border-box;
    }
    
    body {
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
