import React from 'react'

import CardDataStats from '../../components/cards/Cardstats';
import ChartOne from '../../components/cards/chartone';
import PageTitle from '../../../../pagetitle/pagetitle';
import { useSelector } from 'react-redux';


const BusinessDashboard = () => {
  const {user}=useSelector((state)=>state.auth);
  return (
    <>
    <div className='flex flex-col gap-10'>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
    <CardDataStats title="Total appointment" total="4" rate="0.43%" levelUp>
        {/* <svg width="64px" height="64px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"> */}
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACY0lEQVR4nO2ZX2/SUBjG+33cF/BG73B67YxLvNEP0LBE/QoLNbudlyrExWUZSaEtnUz5t8zELDMRmGaFlrVAh8JneE2Lra/hyMrhaGtynuQJ+cFp8j7veeAGQeDi4uLi+ltabW/cSZ2lnVtf0hCXU2dpJ/V1Y5UqwLXj+87Kh3VIgC+oAiRgcAjMA6zwG1j/9xXa/6hBUizQ6Ng8haRYoNEnuw1JsUCj9uAckmKBRueuCYtYax7C3kkRtM/vIvGm+QJEYws2uy+JjE0VwBzZsIi94QJHYdHYCk1ibKoAvW99WMR6s+IP571G4YyZ9YeVrCyRsakC2N8HkBQLNOqPh4Ctt977GzxoVZhwxnoVbpzE2FQBBmMXsHGHWbCIOk9ibCYBvM35G2xWZtioFaH2ZA0aD2/6r526Mve8x5I17fwzK0vkpQMMx5cQxUZNgaMH12dsVORIzw8jmEkAPdhgq/ob1x/f9QeWi899lgvbPteerhHPB5z5uXHJyhGZeQDcYcxebbyB8ecee++Tzgcsos6TePkAk0vA9jYX/IpgDm+gsD29ATm4gXvE8wFLVm7a+V6WyNhMAvzJnbpK/A50Glqk54cRTBXAnYwAO/wVaVVnuFtX/c43Ht3wN99taHPPeyyhzpMYm0kA3GEWLKLOk5h5gF8drjJhKex8jsjMA8Rpgc0NzO/0VRx7gL0lOx97gIMlOx97APd/+w50HTP2wd3JCLqORRcgrxfAGvRiHd7sX0C+JNMF2Mm/cXbyuxC3X+/v2lQB1EP1tvK25KjlEsRlpazZSlmn+4ODi4uLi0u4Qj8A92oKx8EcIX0AAAAASUVORK5CYII=" alt="calendar-emoji"/>        {/* </svg> */}
      </CardDataStats>  
          <CardDataStats title="Total Profit" total="$45.2K" rate="4.35%" levelUp >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADL0lEQVR4nO2X3U9SYRzHn9VqXTWtW1u1+gPaQJsVJUn5lrlWzrQ24cbbtrYW52GNoU0zDVKJbKZmTs66qBvXXxCooyMI8vI84CDhJr1tbnX1tMNEEDhwcAMe6ny378XZODy/z/P7Pi8HAEmSJNGpTnIYMPgbgJgTsAMwASWoCEH8BEBMBM2gCVAx0qHHOWDMpS9IG6oHEM8DBg0CffC46Pf6uCMAIg8dIBC1AIh+JwtATqD1nxS1TiBi6egIDLYDBv/JzDf+DrSe6jyd+JxzjcBSgWR0It3ICfTeE6I7waAdAAOW0oLkhRCAyQXB7G63yQ3AXKY4ISuAKJY1ZvpIlWCcGPwLMFixbwwm8AhA3FcGCDwF9OQQ0AXPCcIw6IsoiLLFicHTcYiEdL7TAOJI3tilxqlkYgLKnJ1IlzZ0PmtnytoJXhA9Ew2RD6ZsELz03qMAokXBOAnpaeDMvpiVJU7p0keOAYgtAKIBURAJ6UKn4uAQfwIQXxD9niRJkoqj3shsVc/mQnXCze6xmhtr42dpcLN7rCa1Nr7WrBCaKPtVE2NJqpWro0RmM1Bh5erovtp4q6PWxQwQddS6XYEg2xKILG2m6lcGSZvPTLo2ZsjDH/OkJzxH7ganiGrNROSV0pHWdTNRx6wZAyTcE/5Irjhe0A3S4Z8UBEh176aVKBzDdII0rplEQSTMR652qZ8uELnNQB5E5gsC4d3sGacLRMG9LBiC9/2NWbpAmtxjBwJRR61EZqcIpGV94kAgvGvtA/SAqApc6Hu7V3SBrmhdWhk6EMi94Hu6QGQ2A+kKzRQM0ug00geicAznPNHT3bkxnbNIub2fqFxG0sAlx1M6X5HrTuPeNadoJzt/KPI7UT6I7vAcubj8PO9VJ/H7Bm40DpB4bto9f4p617rKjZDu8IfsEFGWdAQmRe1U7f63yQi6jOSm+/Xec5v3TfFB4rYbyDVuJD7gncA7cts/GZ/F+uVB0fmvWxog7T4LafGY4/8nt/WTVq+Z3PJZSN3uRPx/3yOaKLtVcSAx9mdmR2Is1MRYLtUql2nr8srQDg1WuUxb6fWpY1YmA0SSJEn/tv4C8eQ1pvbbcSoAAAAASUVORK5CYII=" alt="economic-improvement"/>
          </CardDataStats>  
      <CardDataStats title="Service pending" total="2,450" rate="2.59%" levelUp >
        <img src="data:image/png;base64,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">
        </img>
      </CardDataStats>
      <CardDataStats title="Total Revenue" total="$10.5M" rate="3.12%" levelUp >
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD7UlEQVR4nO1ZTWhcVRT++rMQ0VYULRU37aJaxB9aEbTduFEX7cZCl8WIuDHgTvMsEkEXBam6k5parLjQLlpopU3mnOmUNkG7EUuxLUKRCKntm9HJzJybSarplfOSN9zMvJn3xrzMJGU+OBDeuzn3++49595z3gA99NBDLKYIL/xNWB8/EpAsXjaEw4ZwTRiipn8bwpC+S+KjmMMDOifSQOE01hnCn4ZRMIx37CBWR40rD+MJIYwahm1lwrigY6N82EGsFsI+w7hlGL4KWbQAYRxcQIDwUzmDre6YCuMlw5isJztzfW9gEUIm9X/gwDCeN4RLdWIPLlqAIewRxh+OgGp1BJvC97qaUeTVbk+8HVjkbhCK7k6YDJ4Txqwzz+8mg9eQBuxJ3GsIHyp5w/jIfdcQNtk1dvryTjsz3mdtZTiwZkKE8aO1WOUs1hFhGJ3L5nAP0kaVsNnmcN+ChK0jpeRDwnECjIpwErt8Gg+bDB5Fp2AYXzXE/XhfQHZq7JGWyeyE0tCSkJsmbNGtrDd9XhOgx2MzAaMbkgq4VvN3Ftuj5pQz2Ni2AMPY3WTS3eEYIVQaQ2hHLWRCU1EaWpofDSFEqDgL8lbknGexvWMC5pJ4R20nXNPnEf5KSyLg/4ZQlGk4hTvRsRBKgqBkSCJgrIUAxpfoJCSLZ1odo+4FVn+MVi+/2PIYrTCeXjLiGjpCOCaEO1OEneFzw8jFCdCVr2r81yWxEM6HfrR4U9+GcUrvm9SIazEnhM+EcNuZ+GJY1AWlBKHYaieaHJ/FUhaPO0XcRcd/cOOnchvnR3G/YdyoOWf8axiHtLyILebG+5olbtEt5uxcqXLYrYUM4Vebw1qkAWG8Pk/+nIzg2ablNONCXEJr2IQrXw9hbBPCWDAug1eQFua3+NU2Gpohw7haa2gYV5M2NFbnSpN8D51C/0ZrWxmWO/rvRgGbMFqzRKVxMrshjE9T77j6OyegacPuv49tvoev8x5+9j18cdPDhvBdifCQEN4QxpvauXVdgO4E5nHzPTzlezjue7iT92Ad+2VyCA8K4YMFpTuhrB8Bur0DE4V3sTXv4Tt/ALN1xAMrfg4rI/Cb+OCuCih9i0v+AP6JIv7XJ7CVE7EL8FtXBMgwzOQRzBb2NxIvfAxb/j6xr6OpCsh7uB5n/gBmola8MAhbOhrEdlLyV0wOj6UtoG0r7IctHoI1I4nzRj96HdASP/VTqF3yQYL+kJj4rCF807I37sIxmtTIbWNXkoArQtgVS3y5CRDGhH4fssewJjH55SBA5n7JOaAtbFvEuy1AkiTochQgjGkhHK9k8eSiiN/V/UD/ShLQQw89YEXiP4tycJz2wBnCAAAAAElFTkSuQmCC" alt="get-revenue"/>

       </CardDataStats> 
    </div>
    
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartOne/>
    </div>
    
    {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      
    </div> */}
    </div>
    </>
  );
};




export default BusinessDashboard