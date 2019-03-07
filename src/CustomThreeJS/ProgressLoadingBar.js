
/**
 *
 * 初始化Loading Bar
 * @export
 * @param {string} [progressBarId="#progress"]
 * @param {string} [loadingOverlayId='#loading-overlay']
 * @param {number} [percentCompleteNumber=1]
 * @returns
 */
export const initProgressBar= (progressBarId = "#progress", loadingOverlayId = '#loading-overlay', percentCompleteNumber = 1)=> {
    const progressBar = document.querySelector(progressBarId);
    const loadingOverlay = document.querySelector(loadingOverlayId);
    let percentComplete = percentCompleteNumber;
    let frameID = null;

    const updateAmount = 0.5; // in percent of bar width, should divide 100 
   
    const hideBar = () => {
        loadingOverlay.classList.add('loading-overlay-hidden');
        percentComplete = 0;
        progressBar.style.width = 0;
        cancelAnimationFrame(frameID);
    }
    const animateBar = () => {
        loadingOverlay.classList.remove('loading-overlay-hidden');
        percentComplete += updateAmount;
        if (percentComplete >= 100) {

            //  progressBar.style.backgroundColor = 'blue'
            percentComplete = 1;

        }

        progressBar.style.width = percentComplete + '%';

        frameID = requestAnimationFrame(animateBar)

    }
    return {
        animateBar: () => animateBar(),
        hideBar: () => hideBar()
    }
}
