class PCard extends HTMLElement {
    constructor() {
        super();

        this.name = "";
        this.rating = "";
        this.rates = "";
        this.price = "";
        this.code = "";
        this.imgsrc = "";
        this.cardId = "";
    }
    connectedCallback() {
        this.name = this.getAttribute("name");
        this.rating = this.getAttribute("rating");
        this.rates = this.getAttribute("rates");
        this.price = this.getAttribute("price");
        this.code = this.getAttribute("code");
        this.imgsrc = this.getAttribute("imgsrc");
        this.cardId = this.getAttribute("cardId");


        this.render();
    }

    render() {
        this.innerHTML = `
        <a href="#">
            <div style="border-radius: 20px; background: #FFF; height: 343px; position: relative;">
                <img style="
                    display: block; 
                    position: absolute; 
                    bottom: 150px; 
                    left: 0; 
                    right: 0;
                    margin-right: auto;
                    margin-left: auto;
                    height: 50%;" 
                    src="${this.imgsrc}">
                <div style="position: absolute; right: 16.7px; top: 12px;">
                    <a href="#">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.1934 14.6495C0.446801 10.9874 1.36233 5.49417 5.94 3.66311C10.5177 1.83204 13.2643 5.49417 14.1798 7.32524C15.0953 5.49417 18.7575 1.83204 23.3351 3.66311C27.9128 5.49417 27.9128 10.9874 25.1662 14.6495C22.4196 18.3116 14.1798 25.6359 14.1798 25.6359C14.1798 25.6359 5.94 18.3116 3.1934 14.6495Z" stroke="#101A33" stroke-width="2.44142" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
                <div style="
                    position: absolute;
                    left: 8px;
                    bottom: 102.25px;
                    color: #101A33;
                    font-family: Inter;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 24.5px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;">
                    ${this.name}
                </div>
                <div style="position: absolute; bottom: 65px; left: 8px; display: flex; gap: 5px;">
                    <p class="star-rating" id="card${this.cardId}">
                        <i class="my-star star-1" data-star="1"></i>
                        <i class="my-star star-2" data-star="2"></i>
                        <i class="my-star star-3" data-star="3"></i>
                        <i class="my-star star-4" data-star="4"></i>
                        <i class="my-star star-5" data-star="5"></i>
                    </p>
                    <div style="
                        color: #808285;
                        font-family: Inter;
                        font-size: 12.925px;
                        font-style: normal;
                        font-weight: 400;
                        margin: auto 0;">(${this.rates} отзыва)
                    </div>
                </div>
                <div class="product-price">
                    ${this.price} ₸
                </div>
                <div class="product-code">
                    Код: ${this.code}
                </div>
            </div>
        </a>`;
        let i = 0;
        const stars = document.getElementById('card'+this.cardId);
        while (i < parseInt(this.rating)) {
            if(!stars.getElementsByClassName('my-star')[i].classList.contains('is-active')){
                stars.getElementsByClassName('my-star')[i].classList.add('is-active');
            }
            i++;
        }
    }
}

customElements.define("p-card", PCard);