let cart = [];
let totalPrice = 0;

function addToCart(productName, productPrice, productImage) {
    if (!productName || !productPrice || !productImage) {
        alert('Produk tidak valid.');
        return;
    }
    cart.push({ name: productName, price: productPrice, image: productImage });
    totalPrice += productPrice;
    updateCart();
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function createButton(text, style, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    Object.assign(button.style, style);
    button.onclick = onClick;
    return button;
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        const text = document.createElement('span');
        text.textContent = `${item.name} - Rp. ${item.price.toLocaleString('id-ID')}`;

        const removeButton = createButton('Hapus', {
            marginLeft: '10px',
            backgroundColor: '#f44336',
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer'
        }, () => removeFromCart(index));

        const payButton = createButton('Bayar', {
            marginLeft: '10px',
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer'
        }, showPaymentModal);

        li.appendChild(img);
        li.appendChild(text);
        li.appendChild(removeButton);
        li.appendChild(payButton);

        cartItems.appendChild(li);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Keranjang masih kosong.</li>';
    }

    document.getElementById('total-price').textContent = `Total: Rp. ${totalPrice.toLocaleString('id-ID')}`;
}

function showPaymentModal() {
    document.getElementById('payment-amount').textContent = `Total Pembayaran: Rp. ${totalPrice.toLocaleString('id-ID')}`;
    document.getElementById('payment-modal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function confirmPayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    const message = `Pembayaran sebesar Rp. ${totalPrice.toLocaleString('id-ID')} berhasil dilakukan menggunakan metode ${paymentMethod}.`;

    cart = [];
    totalPrice = 0;
    updateCart();
    closePaymentModal();

    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').style.display = 'block';
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
}
