export const CORS = process.env.REACT_APP_CORS; // CORS 설정

export const UPLOAD_ACCEPT = "application/vnd.ms-excel, text/csv"; // 데이터셋 업로드 시 파일 확장자 설정

export const MLFUNCS_URL = process.env.REACT_APP_MLFUNCS_URL; // ML-Funcs 서버 주소
export const MLFUNCS_SUFFIX_DF = "dataframe/"; // EDA, 전처리 기능 경로
export const MLFUNCS_SUFFIX_PLOT = "plot/"; // 시각화 기능 경로

export const MLTRAIN_URL = process.env.REACT_APP_MLTRAIN_URL; // ML-Train 서버 주소
export const MLTRAIN_SUFFIX_MODEL = "model/"; // 모델 학습 기능 경로

// UPM = User-Proj-Managing
export const MODEL_KEY_PREFIX = "model/";
export const UPM_PROJ_URL = process.env.REACT_APP_UPM_PROJ_URL; // User-Proj-Managing(사용자 프로젝트 관리) 서버 주소
export const UPM_MODEL_URL = process.env.REACT_APP_UPM_MODEL_URL; // User-Proj-Managing(사용자 프로젝트 관리) 서버 주소

export const USER_AUTH_URL = process.env.REACT_APP_USER_AUTH_URL; // User-Auth 서버 주소

export const DL_API_URL = process.env.REACT_APP_DL_API_URL; // DL-API 서버 주소
export const DL_API_CV = "cv/"; // DL-API 분류 - CV
export const DL_API_NLP = "nlp/"; // DL-API 분류 - NLP

export const PROFILE_PIC_BASE_URL = `${process.env.REACT_APP_AWS_BASE_URL}/profile_pic/`; // AWS S3 내 사용자 프로필 사진 경로

// EDA, 전처리 기능 각각의 최종 URL 경로
export const URLS_PREPROCESS = {
  // EDA
  DataUpload: "uploadfile",
  Head: "head",
  Tail: "tail",
  Shape: "shape",
  Dtype: "dtype",
  ColumnList: "columns",
  Unique: "unique",
  IsNa: "isna",
  Corr: "corr",
  Describe: "describe",
  LocDf: "loc",
  ILocDf: "iloc",
  ColConditionDf: "col_condition",

  // 전처리
  Transpose: "transpose",
  Groupby: "groupby",
  Drop: "drop",
  DropNa: "dropna",
  RenameCol: "rename",
  SortValue: "sort_values",
  MergeDf: "merge",
  ConcatDf: "concat",
  SetColumn: "set_column",

  // 시각화
  BoxPlot: "boxplot",
  HistPlot: "histplot",
  CountPlot: "countplot",
  ScatterPlot: "scatterplot",

  // 데이터셋 분할
  FeatureTargetSplit: "feature_target_split",
  TrainTestSplit: "train_test_split",
};

export const URLS_TRAIN = {
  // 모델 제작 & 훈련
  MakePipeline: "make_pipeline",
  MakeOptimizer: "make_optimizer",
  Fit: "fit",
  Transform: "transform",
  ModelSteps: "steps",
  ModelStepsDetail: "steps_detail",
};

export const URLS_EVAL = {
  // 모델 제작 & 훈련
  Predict: "predict",
  Score: "score",
};

export const URLS_USER_AUTH = {
  index: "index",
  nickname_check: "nickname_check",
  email_check: "email_check",
  email_confirm: "email_confirm",
  signup: "signup",
  login: "login",
  search_pw: "search_pw",
  nickname_change: "nickname_change",
  pw_change: "pw_change",
  profile_pic_change: "profile_pic_change",
  inactive: "inactive",
  refresh_jwt: "refresh_jwt",
  remove_jwt: "remove_jwt",
};

export const URLS_DL_API = {
  posts: "posts/", // AI 예시 프로젝트 게시물 관련 URL 경로
  hair_color_gen: "hair_color_gen",
};

// fetch API로 HTTP 통신하기 위한 설정
export const httpConfig = (data = null, method = "POST", contentJson = false) => ({
  method: method,
  mode: CORS, // 'cors'
  body: data,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("aiplay_csrf_token")}`,
    "X-CSRFToken": localStorage.getItem("aiplay_csrf_token"),
    "Content-Type": contentJson ? "application/json" : "text/plain;charset=UTF-8",
    "User-Id": localStorage.getItem("AIPLAY_USER_IDX"),
    token: localStorage.getItem("AIPLAY_USER_TOKEN"),
  },
  credentials: "include",
});

// 요청 대상 URL에 쿼리 파라미터를 추가하는 함수
export const targetURL = (url, params = "") => {
  // 대상 URL을 받아서 URL 객체 생성
  const targetUrl = new URL(url);
  // 백앤드 API 요청에 필요한 파라미터 설정
  targetUrl.search = new URLSearchParams(params).toString();

  return targetUrl;
};
