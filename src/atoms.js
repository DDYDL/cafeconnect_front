import {atomWithStorage,createJSONStorage} from 'jotai/utils';

export const initMember = {
    nickname:'',
    deptName:'',
    roles:''
}
// 세션 스토리지에 member 저장
export const memberAtom = atomWithStorage("member", initMember, createJSONStorage(()=>sessionStorage));

// 세션 스토리지에 token 저장
export const tokenAtom = atomWithStorage(
    'token',
    '',
    createJSONStorage(()=>sessionStorage),
)