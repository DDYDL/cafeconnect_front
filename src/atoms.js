import {atomWithStorage,createJSONStorage} from 'jotai/utils';

export const initMember = {
    // member가 store를 하나는 꼭 가지고 있기 때문에(회원가입 시 store있어야 함) storeCode 하나씩 가지고 있기
    storeCode:'',
    storeName:'',
    username:'',
    deptName:'',
    roles:''
}
// 세션 스토리지에 member 저장
export const memberAtom = atomWithStorage(
    "member",
    initMember,
    createJSONStorage(()=>sessionStorage)
);

// 세션 스토리지에 로그인 token 저장
export const tokenAtom = atomWithStorage(
    'token',
    '',
    createJSONStorage(()=>sessionStorage)
)

// 세션 스토리지에 알람을 위한 firebase token 저장
export const fcmTokenAtom = atomWithStorage(
    'fcmtoken',
    '',
    createJSONStorage(()=>sessionStorage)
)

// 세션 스토리지에 알람 리스트 저장
export const alarmsAtom = atomWithStorage(
    'alarms',
    [],
    createJSONStorage(()=>sessionStorage)
)