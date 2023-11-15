declare namespace API {
  type AiResponseMessage = {
    _end?: boolean;
    created?: number;
    id?: string;
    messages?: Message[];
    need_clear_history?: boolean;
    object?: string;
    result?: string;
    sentence_id?: number;
    usage?: Usage;
  };

  type BaseResponseAiResponseMessage_ = {
    code?: number;
    data?: AiResponseMessage;
    message?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseListChat_ = {
    code?: number;
    data?: Chat[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageChatAssistant_ = {
    code?: number;
    data?: PageChatAssistant_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BiResponse = {
    chartId?: number;
    genChart?: string;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: string;
    name?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChartQueryRequest = {
    chartType?: string;
    current?: number;
    goal?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type Chat = {
    assistantId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: string;
    isUser?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChatAssistant = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: string;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChatAssistantQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type ChatQueryRequest = {
    assistantId?: number;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getAnswerUsingPOSTParams = {
    assistantId?: number;
    content?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    integral?: number;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type Message = {
    content?: string;
    role?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Chart[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageChatAssistant_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ChatAssistant[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type uploadUsingPOSTParams = {
    /** module */
    module: string;
  };

  type Usage = {
    completion_tokens?: number;
    prompt_tokens?: number;
    total_tokens?: number;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    integral?: number;
    isDelete?: string;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAccount?: string;
    userAvatar?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    integral?: number;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserVO = {
    accessKey?: string;
    createTime?: string;
    id?: number;
    integral?: number;
    secretKey?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };
}
