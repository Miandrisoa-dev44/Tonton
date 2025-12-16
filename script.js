        /* --- GESTION MENU --- */
        function toggleSideMenu() {
            const menu = document.getElementById('sideMenu');
            const backdrop = document.getElementById('menuBackdrop');
            const btn = document.querySelector('.magic-toggle-btn');
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                backdrop.classList.remove('active');
                btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
            } else {
                menu.classList.add('open');
                backdrop.classList.add('active');
                btn.style.opacity = '0'; btn.style.pointerEvents = 'none';
            }
        }

        /* --- FILTRES --- */
        function filterBooks(category, btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cards = document.querySelectorAll('.book-card');
            cards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block'; setTimeout(() => card.style.opacity = '1', 100);
                } else {
                    card.style.opacity = '0'; setTimeout(() => card.style.display = 'none', 300);
                }
            });
        }

        /* --- LECTURE LIVRE --- */
        const modal = document.getElementById('modal');
        const iframe = document.getElementById('book-frame');
        const errorMsg = document.getElementById('error-msg');
        const fileNameDisplay = document.getElementById('file-name-display');

        function openBook(filename) {
            modal.classList.add('active');
            errorMsg.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = filename;
            document.getElementById('modal-title').innerText = "Lecture : " + filename;
            fileNameDisplay.innerText = filename;
            iframe.onerror = function() { iframe.style.display = 'none'; errorMsg.style.display = 'block'; };
        }
        function closeModal() { modal.classList.remove('active'); iframe.src = ""; }
        
        /* --- INFOS & CONTACT --- */
        function openInfo(type) {
            const overlay = document.getElementById('info-modal');
            document.getElementById('content-about').style.display = (type === 'about') ? 'block' : 'none';
            document.getElementById('content-contact').style.display = (type === 'contact') ? 'block' : 'none';
            overlay.classList.add('open');
        }
        function closeInfo() { document.getElementById('info-modal').classList.remove('open'); }
        function closeAllModals() { closeInfo(); closeModal(); closeDonationModal(); }

        /* --- EMAIL (MAILTO) --- */
        function envoyerEmailDeric() {
            const nom = document.getElementById('contact-nom').value;
            const email = document.getElementById('contact-email').value;
            const msg = document.getElementById('contact-message').value;
            const dest = "rmiandrisoaderic@gmail.com"; // VOTRE EMAIL ICI
            const corps = "De: " + nom + " (" + email + ")\n\n" + msg;
            window.location.href = "mailto:" + dest + "?subject=Message Site Deric&body=" + encodeURIComponent(corps);
            closeInfo();
        }

        /* --- DONATION USSD --- */
        const NUM_MVOLA = "0341108401"; // VOTRE NUMERO
        const NUM_ORANGE = "0325230418"; // VOTRE NUMERO

        function openDonationModal() {
            document.getElementById('donation-overlay').classList.add('open');
            document.getElementById('donation-step-1').style.display = 'block';
            document.getElementById('donation-step-2').style.display = 'none';
        }
        function closeDonationModal() { document.getElementById('donation-overlay').classList.remove('open'); }
        
        function processPayment(provider) {
            const name = document.getElementById('donator-name').value;
            const amount = document.getElementById('donator-amount').value;
            if (!name || !amount) { alert("Remplissez tout !"); return; }
            
            let ussd = "";
            if (provider === 'mvola') ussd = "%23"+"111*1*2*" + NUM_MVOLA + "*" + amount + "*2*1111"+"%23";
            else if (provider === 'orange') ussd = "%23"+"144*1*1*" + NUM_ORANGE + "*" + NUM_ORANGE + "*" + amount + "*2"+"%23";
            
            window.location.href = "tel:" + ussd;
            
            document.getElementById('donation-step-1').style.display = 'none';
            document.getElementById('donation-step-2').style.display = 'block';
            document.getElementById('thx-message').innerText = "Merci " + name + " !";
        }

        /* --- ANIMATION DERIC & PARTICULES --- */
        const msgs = ["Courage !", "Le savoir c'est le pouvoir", "Tartine de science ?", "Tu vas réussir !"];
        function dericSpeak() {
            const b = document.getElementById('deric-msg');
            b.innerText = msgs[Math.floor(Math.random() * msgs.length)];
            b.classList.add('show');
            setTimeout(() => b.classList.remove('show'), 4000);
        }
        setInterval(dericSpeak, 15000);

        document.addEventListener('mousemove', function(e) {
            if(Math.random() > 0.85) createParticle(e.clientX, e.clientY);
        });
        function createParticle(x, y) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.background = ['#ffadad','#ffd6a5','#fdffb6','#caffbf','#a0c4ff'][Math.floor(Math.random()*5)];
            p.style.left = x + 'px'; p.style.top = y + 'px';
            const mx = (Math.random()-0.5)*50; const my = (Math.random()-0.5)*50;
            p.animate([{transform:'translate(0,0)'},{transform:`translate(${mx}px,${my}px)`}], {duration:1000});
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1000);
        }
        
        
        function lirePresentationDeric() {
        // 1. Vérification de compatibilité (Est-ce que le navigateur sait parler ?)
        if (!('speechSynthesis' in window)) {
            alert("Oups ! Ton navigateur est un peu trop ancien ou ne supporte pas la voix de Tonton Deric. Essaie avec Google Chrome ou Firefox !");
            return; // On arrête là pour éviter l'erreur
        }

        // Le texte à lire
        const texte = "Manao ahoana e ! Izaho ilay Prof Grille-pain (Mpanatsatsika mofo) milay indrindra eto Madagasikara. Nianatra tao amin'ny ENSET aho mba ho lasa mpampianatra 'cool' eto Mada. Afaka manome anareo mofo ben'ny lesona amin'ny endrika PDF tena raitra aho. Afaka manafatra ny lesona feno amin'ny endrika PDF kanto ianareo, tahaka ilay modely hita ao amin'ny pejy web-ko. Ary raha manana lesona ianareo ka tsy tsara kalitao ny PDF-ny, aza misalasala miantso ahy fa amboariko ho lasa mahaliana sy manintona be ny lesona na ny fampiasanareo. Milay aminareo foana aho an!";

        // 2. Création de l'objet de parole (avec une sécurité)
        try {
            const parole = new SpeechSynthesisUtterance(texte);
            
            // Réglages de la voix
            parole.lang = 'fr-FR'; // Langue française
            parole.pitch = 0.9;    // Un peu plus grave
            parole.rate = 1.1;     // Un peu rapide
            parole.volume = 1;     // Volume max

            // 3. Choisir une voix française si disponible (Optionnel mais mieux)
            const voices = window.speechSynthesis.getVoices();
            const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
            if (frenchVoice) {
                parole.voice = frenchVoice;
            }

            // 4. Parler
            window.speechSynthesis.cancel(); // Arrête si ça parlait déjà
            window.speechSynthesis.speak(parole);

        } catch (e) {
            console.error("Erreur de synthèse vocale :", e);
            alert("Désolé, Tonton Deric a une extinction de voix sur ce téléphone/ordinateur.");
        }
    }