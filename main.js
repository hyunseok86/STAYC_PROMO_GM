const initCanvasSize = () => {
    canvas.width = window.innerWidth - 18;
    canvas.height = window.innerHeight - 18;

    const canvasAspectRatio = canvas.width / canvas.height;
    const characterSizePercentage = 0.04; // 캐릭터 크기를 캔버스 크기의 비율로 정의

    if (canvasAspectRatio > 1) {
        // 가로 방향으로 넓은 화면
        player.width = canvas.width * characterSizePercentage;
        player.height = player.width;
    } else {
        // 세로 방향으로 긴 화면
        player.height = canvas.height * characterSizePercentage;
        player.width = player.height;
    }

    // 캐릭터 초기 위치 재조정
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 10;
}
