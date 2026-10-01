var bar = new ProgressBar.Line('#containerGrade', {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FF7900',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {
        width: '100%',
        height: '100%'
    }
});

bar.animate(0.25);