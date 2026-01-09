import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import firebaseConfig from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form Submission
const memberForm = document.getElementById('member-form');

memberForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const goal = document.getElementById('goal').value;
    const message = document.getElementById('message').value;

    try {
        // Realtime Database의 'members' 경로에 새로운 데이터 추가
        const memberListRef = ref(db, 'members');
        const newMemberRef = push(memberListRef);
        
        await set(newMemberRef, {
            name: name,
            phone: phone,
            goal: goal,
            message: message,
            timestamp: new Date().toISOString() // RTDB는 ISO 스트링이나 타임스탬프 숫자로 저장하는 것이 좋습니다
        });
        
        console.log("Data saved successfully with ID: ", newMemberRef.key);
        alert("회원 등록 상담이 성공적으로 신청되었습니다!");
        memberForm.reset();
        
    } catch (e) {
        console.error("Error saving data: ", e);
        alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
});
