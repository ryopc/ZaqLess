        window.onload = function() {
            lucide.createIcons();
        };

        // タブ切り替え
        function switchDemoTab(tab) {
            playSound('tap');
            const mathTabBtn = document.getElementById('tab-math-btn');
            const wordsTabBtn = document.getElementById('tab-words-btn');
            const mathContent = document.getElementById('demo-math-content');
            const wordsContent = document.getElementById('demo-words-content');

            if (tab === 'math') {
                mathTabBtn.className = "py-1.5 rounded-lg transition-all bg-white text-slate-900";
                wordsTabBtn.className = "py-1.5 rounded-lg transition-all text-white hover:bg-white/5";
                mathContent.classList.remove('hidden');
                wordsContent.classList.add('hidden');
            } else {
                wordsTabBtn.className = "py-1.5 rounded-lg transition-all bg-white text-slate-900";
                mathTabBtn.className = "py-1.5 rounded-lg transition-all text-white hover:bg-white/5";
                mathContent.classList.add('hidden');
                wordsContent.classList.remove('hidden');
            }
        }

        // 算数デモ: 紙への書き方お手本アニメーション
        let guideRunning = false;
        function playMathGuide() {
            if (guideRunning) return;
            guideRunning = true;
            playSound('tap');

            const num3 = document.getElementById('math-num-3');
            const num3Slash = document.getElementById('math-num-3-slash');
            const num3New = document.getElementById('math-num-3-new');
            const carry10 = document.getElementById('math-guide-carry');
            const guideBtn = document.getElementById('math-guide-btn');

            guideBtn.disabled = true;
            guideBtn.classList.add('opacity-50');

            // 1. 3を斜め線で消すアニメーション
            num3Slash.className = "absolute w-full h-[2px] bg-rose-500 rotate-45 transition-all duration-500 opacity-100 scale-x-100";
            num3.className = "text-slate-500 scale-95 transition-all duration-500";

            // 2. 1秒後に上に「2」とメモを出現させる
            setTimeout(() => {
                num3New.className = "absolute -top-3 right-0 text-[10px] text-amber-400 font-bold transition-all duration-500 opacity-100 scale-110";
                playSound('tap');
            }, 800);

            // 3. さらに0.8秒後に一の位の上に「10」を借りてくるメモを出す
            setTimeout(() => {
                carry10.className = "w-8 text-center text-[10px] bg-amber-500/20 border border-amber-500/40 rounded transition-all duration-500 opacity-100 transform translate-y-0 scale-110";
                playSound('gachan');
            }, 1600);

            // 4. ガイド完了後、ボタンを戻す
            setTimeout(() => {
                guideBtn.disabled = false;
                guideBtn.classList.remove('opacity-50');
                guideRunning = false;
            }, 2500);
        }

        // 算数デモ判定 (アラートに代わるモーダル等も検討できますが、今回はシンプルな親しみやすいメッセージ表示に変更)
        function answerMathDemo(num) {
            const resultBox = document.getElementById('math-question-mark');
            if (num === '7') {
                playSound('correct');
                resultBox.innerText = '7';
                resultBox.className = "w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded text-sm font-bold animate-pulse";
                
                // ポップアップメッセージの表示
                setTimeout(() => {
                    alert('大正解！すごーーい！👏\n手元の紙に「2」と「10」はうまく落書きできたかな？\n\nスマホをノート代わりに使わずに、いらない紙にちょこっと書くだけで、脳にばっちり計算ルールが染み込みます！この調子で次のステップへ進もう！');
                }, 100);
            } else {
                playSound('incorrect');
                resultBox.classList.add('bg-rose-600');
                setTimeout(() => {
                    resultBox.classList.remove('bg-rose-600');
                }, 400);
            }
        }

        // 国語デモ判定
        function selectTsukuriDemo(tsukuri, kanji) {
            const resultBox = document.getElementById('word-result');
            const feedback = document.getElementById('words-feedback');
            const guideChar = document.getElementById('word-guide-char');
            const board = document.getElementById('word-animation-board');
            const finishedBtn = document.getElementById('word-finished-btn');

            playSound('gachan');
            setTimeout(() => playSound('correct'), 150);

            resultBox.innerText = kanji;
            resultBox.className = "w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-xl text-lg font-black shadow-lg shadow-emerald-500/30";
            
            // 下のなぞり書きガイドボードを明るくし、お手本「柏」を浮き出させる
            board.classList.remove('opacity-50');
            guideChar.classList.remove('text-slate-700/20');
            guideChar.classList.add('text-rose-400/40', 'scale-110', 'animate-pulse');

            // 紙に書く確認ボタンをアクティブ化
            finishedBtn.removeAttribute('disabled');
            finishedBtn.className = "py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer";

            feedback.innerText = `がっちゃんこ大成功！「${kanji}（かしわ）」ができたよ！さあ、手元の紙にお手本を見ながらささっと3回書いてみよう！`;
            feedback.className = "text-center text-xxs text-emerald-400 font-bold";
        }

        // 国語デモ：手元の紙に書いたよ確認アクション
        function completeWordDemo() {
            playSound('correct');
            alert('素晴らしい！本物の紙に「柏」の文字がしっかり落書きできたね！✍️✨\n手で紙のザラザラや鉛筆の重さを感じながら書くことで、脳が一気に「あ、この漢字、覚えたぞ！」と反応します。\nZaqLessなら、面倒な書き写しゼロで漢字がどんどん得意になるよ！');
        }
