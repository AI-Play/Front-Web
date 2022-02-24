export const CORS = "cors"; // CORS 설정

export const UPLOAD_ACCEPT = "application/vnd.ms-excel, text/csv"; // 데이터셋 업로드 시 파일 확장자 설정

export const MLFUNC_URL = "http://localhost:8000/"; // ML-Funcs 서버 주소
export const MLFUNC_SUFFIX_DF = "dataframe/"; // EDA, 전처리 기능 경로
export const MLFUNC_SUFFIX_PLOT = "plot/"; // 시각화 기능 경로

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
  // "set_column": "set_column",
};

// fetch API로 HTTP 통신하기 위한 설정
export const httpConfig = (data) => ({
  method: "POST",
  mode: CORS,
  body: data,
});

// 요청 대상 URL에 쿼리 파라미터를 추가하는 함수
export const targetURL = (url, params = "") => {
  // 대상 URL을 받아서 URL 객체 생성
  const targetUrl = new URL(url);
  // 백앤드 API 요청에 필요한 파라미터 설정
  targetUrl.search = new URLSearchParams(params).toString();

  return targetUrl;
};