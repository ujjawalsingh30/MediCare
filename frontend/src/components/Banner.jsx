import React from 'react'
import { bannerStyles } from '../assets/dummyStyles'
import { Stethoscope } from 'lucide-react'

const Banner = () => {
    return (
        <div className={bannerStyles.bannerContainer}>
            <div className={bannerStyles.mainContainer}>
                <div className={bannerStyles.borderOutline}>
                    <div className={bannerStyles.outerAnimatedBand}></div>
                    <div className={bannerStyles.innerWhiteBorder}></div>
                </div>

                <div className={bannerStyles.contentContainer}>
                    <div className={bannerStyles.flexContainer}>
                        <div className={bannerStyles.leftContent}>
                            <div className={bannerStyles.headerBadgeContainer}>
                                <div className={bannerStyles.stethoscopeContainer}>
                                    <div className={bannerStyles.stethoscopeIcon}>
                                        <Stethoscope className={bannerStyles.stethoscopeIcon} />
                                    </div>
                                </div>


                                <div className={bannerStyles.titleContainer}>
                                    <h1 className={bannerStyles.title}>
                                        Medi
                                        <span className={bannerStyles.titleContainer}>
                                            Care+
                                        </span>
                                    </h1>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
