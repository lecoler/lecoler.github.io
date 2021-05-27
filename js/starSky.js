//init banner
$('#banner').height(window.innerHeight);

//星空 banner
class starrySky {
    constructor(num) {
        this.maxStars = num;
        let canvas = $('#starrySky')[0];
        this.ctx = canvas.getContext('2d');
        this.w = canvas.width = window.innerWidth;
        this.h = canvas.height = window.innerHeight;
        this.stars = [];
        this.createStar();
        this.runSky();
    }

    createStar() {
        for (let i = 0; i < this.maxStars; i++) {
            //最后项 星星颜色
            this.stars.push(new star(this.w, this.h, this.maxStars, Math.round(Math.random()*360)));
        }
    }

    runSky() {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 0.5;                                 //尾巴
        this.ctx.fillStyle = 'hsla(' + 214 + ', 2%, 5%, 2)';  //背景色
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.globalCompositeOperation = 'lighter';
        for (let i of this.stars) {
            const {x, y, star, alpha, radius} = i.drawStar();
            this.ctx.globalAlpha = alpha;
            this.ctx.drawImage(star, x - radius / 2, y - radius / 2, radius, radius);
        }
        window.requestAnimationFrame(() => this.runSky());
    }
}

class star {
    constructor(w, h, maxStars, color) {
        //星星
        this.star = star.createStarBox(color);
        this.orbitRadius = star.random(star.move(w, h));
        this.radius = star.random(60, this.orbitRadius) / 10;       //星星大小,值越大星星越小,默认8
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = star.random(0, maxStars);
        this.speed = star.random(this.orbitRadius) / 65000 * (Math.round(Math.random()) ? 1 : -1);        //星星移动速度,值越大越慢,默认5W
        this.alpha = star.random(2, 10) / 10;
    }

    static createStarBox(color) {
        let canvas2 = $('<canvas></canvas>')[0];
        let ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        let half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + color + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + color + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');
        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();
        return canvas2;
    }

    static random(min, max) {
        if (arguments.length < 2)
            [min, max] = [0, min];
        else if (min > max)
            [min, max] = [max, min];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static move(x, y) {
        let max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        //星星移动范围，值越大范围越小，
    }

    drawStar() {
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = star.random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        this.timePassed += this.speed;
        return {
            x,
            y,
            star: this.star,
            alpha: this.alpha,
            radius: this.radius,
        };
    }

}

new starrySky(1000);

