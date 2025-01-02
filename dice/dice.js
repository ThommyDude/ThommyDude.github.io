document.addEventListener(
    'DOMContentLoaded',
    () => {
        console.log('Page loaded!');

        const currentHREF = window.location.href;
        const currentUrl = new URL(currentHREF);
        
        const diceType = Number(currentUrl.searchParams.get('dice').replace('d', '')) || 20;
        const diceCount = Number(currentUrl.searchParams.get('count')) || 1;

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