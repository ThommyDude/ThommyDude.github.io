document.addEventListener(
    'DOMContentLoaded',
    () => {
        console.log('Page loaded!');

        const currentHREF = window.location.href;
        const currentUrl = new URL(currentHREF);

        let diceType = 20;
        let diceCount = 1;

        if (currentUrl.searchParams.has('dice')) {
            diceType = Number(currentUrl.searchParams.get('dice').replace('d', ''));
        }

        if (currentUrl.searchParams.has('count')) {
            diceCount = Number(currentUrl.searchParams.get('count'));
        }

        const resultElement = document.getElementById('result');

        let rolls = [];

        for (let i = 0; i < diceCount; i++) {
            rolls.push(
                Math.floor((Math.random() * diceType) + 1)
            );
        }

        const totalFromRolls = rolls.reduce(
            (sum, current) => sum + current
        );

        resultElement.innerText = `${diceCount} d${diceType}, resulting in a total of ${totalFromRolls}`;
    }
);