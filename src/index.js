
export class MyDurableObject {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    // 解析请求内容或参数
    const url = new URL(request.url);

  
     // 目标 Emby 服务器的 URL
	  const targetUrl = 'https://random.ouonet.org';

	  // 构造新的请求，保留原始请求的 URL 路径和查询参数
	 
	  const newUrl = targetUrl + url.pathname + url.search;

    // 传递请求方法、头部等
  const newRequest = new Request(newUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
  });

  // 发出请求到目标 Emby 服务器
  const response = await fetch(newRequest);
 

    // 返回响应
  return response;
  }
}

export default {
  async fetch(request, env) {
    // 获取或创建 Durable Object 实例
    const id = env.MY_DURABLE_OBJECT.idFromName("singleton");
    const obj = env.MY_DURABLE_OBJECT.get(id);

    // 向 Durable Object 发起fetch，实现请求下发
    const doResponse = await obj.fetch();

    return doResponse;
  }
}