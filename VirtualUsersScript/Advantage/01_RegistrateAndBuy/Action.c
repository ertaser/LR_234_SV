Action()
{
	lr_start_transaction("Go_to_advantage");
	
	web_set_user("Filoria", 
		lr_unmask("6588099d828ac80d0a0385543e5d"), 
		"localhost:8080");

	web_add_header("Upgrade-Insecure-Requests", 
		"1");

	web_url("localhost:8080", 
		"URL=http://localhost:8080/", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=", 
		"Snapshot=t1.inf", 
		"Mode=HTML", 
		LAST);

	web_set_sockets_option("SSL_VERSION", "2&3");



	web_add_cookie("userCart=%7B%22userId%22%3A-1%2C%22productsInCart%22%3A%5B%5D%7D; DOMAIN=localhost");

	web_url("ALL", 
		"URL=http://localhost:8080/catalog/api/v1/DemoAppConfig/parameters/by_tool/ALL", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t2.inf", 
		"Mode=HTML", 
		LAST);

	web_add_header("Origin", 
		"http://localhost:8080");

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceGetAccountConfigurationRequest");

	web_add_header("X-Requested-With", 
		"XMLHttpRequest");

	web_custom_request("GetAccountConfigurationRequest", 
		"URL=http://localhost:8080//accountservice/ws/GetAccountConfigurationRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t3.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><GetAccountConfigurationRequest xmlns=\"com.advantage.online.store.accountservice\"></GetAccountConfigurationRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_url("categories", 
		"URL=http://localhost:8080/catalog/api/v1/categories", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t4.inf", 
		"Mode=HTML", 
		LAST);

	web_url("search", 
		"URL=http://localhost:8080/catalog/api/v1/deals/search?dealOfTheDay=true", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t5.inf", 
		"Mode=HTML", 
		LAST);

	web_url("popularProducts.json", 
		"URL=http://localhost:8080/app/tempFiles/popularProducts.json", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t6.inf", 
		"Mode=HTML", 
		LAST);

	web_url("home-page.html", 
		"URL=http://localhost:8080/app/views/home-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t7.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Go_to_advantage",LR_AUTO);
	
	lr_think_time(7);

	lr_start_transaction("Chuse");

	web_url("products", 
		"URL=http://localhost:8080/catalog/api/v1/categories/1/products", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t8.inf", 
		"Mode=HTML", 
		LAST);

	web_url("attributes", 
		"URL=http://localhost:8080/catalog/api/v1/categories/attributes", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t9.inf", 
		"Mode=HTML", 
		LAST);

	web_url("category-page.html", 
		"URL=http://localhost:8080/app/views/category-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t10.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Chuse",LR_AUTO);

	lr_think_time(36);

	lr_start_transaction("Chuse_laptops");

	web_url("8", 
		"URL=http://localhost:8080/catalog/api/v1/products/8", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t11.inf", 
		"Mode=HTML", 
		LAST);

	web_url("products_2", 
		"URL=http://localhost:8080/catalog/api/v1/categories/1/products", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t12.inf", 
		"Mode=HTML", 
		LAST);

	web_url("product-page.html", 
		"URL=http://localhost:8080/app/views/product-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t13.inf", 
		"Mode=HTML", 
		LAST);

	web_url("all_data", 
		"URL=http://localhost:8080/catalog/api/v1/categories/all_data", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t14.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Chuse_laptops",LR_AUTO);
	
	lr_start_transaction("Go_tocart");

	web_add_cookie("userCart=%7B%22userId%22%3A-1%2C%22productsInCart%22%3A%5B%7B%22productId%22%3A8%2C%22imageUrl%22%3A%221800%22%2C%22productName%22%3A%22HP%20ZBook%2017%20G2%20Mobile%20Workstation%22%2C%22color%22%3A%7B%22code%22%3A%22414141%22%2C%22name%22%3A%22BLACK%22%2C%22inStock%22%3A10%2C%22%24%24hashKey%22%3A%22object%3A385%22%7D%2C%22quantity%22%3A1%2C%22price%22%3A1799%2C%22hasWarranty%22%3Afalse%7D%5D%7D; DOMAIN=localhost");

	lr_think_time(66);

	web_url("shoppingCart.html", 
		"URL=http://localhost:8080/app/views/shoppingCart.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t15.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Go_tocart",LR_AUTO);

	lr_think_time(7);

	lr_start_transaction("Checkout");

	web_url("user-not-login-page.html", 
		"URL=http://localhost:8080/app/order/views/user-not-login-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t16.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Checkout",LR_AUTO);

	lr_think_time(26);

	lr_start_transaction("Registrate");

	web_url("register-page.html", 
		"URL=http://localhost:8080/app/user/views/register-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t17.inf", 
		"Mode=HTML", 
		LAST);

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceGetCountriesRequest");

	web_add_auto_header("Origin", 
		"http://localhost:8080");

	web_add_auto_header("X-Requested-With", 
		"XMLHttpRequest");

	web_custom_request("GetCountriesRequest", 
		"URL=http://localhost:8080//accountservice/ws/GetCountriesRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t18.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><GetCountriesRequest xmlns=\"com.advantage.online.store.accountservice\"></GetCountriesRequest></soap:Body></soap:Envelope>", 
		LAST);

	lr_end_transaction("Registrate",LR_AUTO);

	lr_start_transaction("Create_Account");

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceAccountCreateRequest");

	lr_think_time(87);

	web_custom_request("AccountCreateRequest", 
		"URL=http://localhost:8080//accountservice/ws/AccountCreateRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t19.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><AccountCreateRequest xmlns=\"com.advantage.online.store.accountservice\"><accountType>USER</accountType><address>Kosovo</address><allowOffersPromotion>false</allowOffersPromotion><cityName>Kosovo</cityName><countryId>Kosovo,rs</countryId><email>Filo@bmail.com</email>"
		"<firstName>Filo</firstName><lastName>Filo</lastName><loginName>Filoria</loginName><password>Filo!@#123</password><phoneNumber>52365623</phoneNumber><stateProvince>Serbia</stateProvince><zipcode>Serbia</zipcode></AccountCreateRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceAccountLoginRequest");

	web_custom_request("AccountLoginRequest", 
		"URL=http://localhost:8080//accountservice/ws/AccountLoginRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t20.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><AccountLoginRequest xmlns=\"com.advantage.online.store.accountservice\"><email>Filo@bmail.com</email><loginPassword>Filo!@#123</loginPassword><loginUser>Filoria</loginUser></AccountLoginRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceGetAccountByIdRequest");

	web_custom_request("GetAccountByIdRequest", 
		"URL=http://localhost:8080//accountservice/ws/GetAccountByIdRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t21.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><GetAccountByIdRequest xmlns=\"com.advantage.online.store.accountservice\"><accountId>283991119</accountId><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></GetAccountByIdRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceGetAccountByIdNewRequest");

	web_custom_request("GetAccountByIdNewRequest", 
		"URL=http://localhost:8080//accountservice/ws/GetAccountByIdNewRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t22.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><GetAccountByIdNewRequest xmlns=\"com.advantage.online.store.accountservice\"><accountId>283991119</accountId><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></GetAccountByIdNewRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_set_sockets_option("INITIAL_AUTH", "BASIC");

	web_revert_auto_header("Origin");

	web_revert_auto_header("X-Requested-With");

	web_url("283991119", 
		"URL=http://localhost:8080/order/api/v1/carts/283991119", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t23.inf", 
		"Mode=HTML", 
		LAST);

	web_url("283991119_2", 
		"URL=http://localhost:8080/order/api/v1/carts/283991119", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t24.inf", 
		"Mode=HTML", 
		LAST);

	web_add_auto_header("Origin", 
		"http://localhost:8080");

	web_custom_request("283991119_3", 
		"URL=http://localhost:8080/order/api/v1/carts/283991119", 
		"Method=PUT", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t25.inf", 
		"Mode=HTML", 
		"Body=[{\"hexColor\":\"414141\",\"productId\":8,\"quantity\":1}]", 
		LAST);

	web_custom_request("shippingcost", 
		"URL=http://localhost:8080/order/api/v1/shippingcost/", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t26.inf", 
		"Mode=HTML", 
		"EncType=application/json;charset=utf-8", 
		"Body={\"seaddress\":{\"addressLine1\":\"Kosovo\",\"addressLine2\":\"\",\"city\":\"Kosovo\",\"country\":\"us\",\"postalCode\":\"Serbia\",\"state\":\"Serbia\"},\"secustomerName\":\"Filo Filo\",\"secustomerPhone\":52365623,\"senumberOfProducts\":0,\"setransactionType\":\"SHIPPING_COST\",\"sessionId\":\"63BC4EF575D92BF777D16D734025B723\"}", 
		LAST);

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceGetAccountPaymentPreferencesRequest");

	web_add_header("X-Requested-With", 
		"XMLHttpRequest");

	web_custom_request("GetAccountPaymentPreferencesRequest", 
		"URL=http://localhost:8080//accountservice/ws/GetAccountPaymentPreferencesRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t27.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><GetAccountPaymentPreferencesRequest xmlns=\"com.advantage.online.store.accountservice\"><accountId>283991119</accountId><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></GetAccountPaymentPreferencesRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_revert_auto_header("Origin");

	web_url("orderPayment-page.html", 
		"URL=http://localhost:8080/app/order/views/orderPayment-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t28.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Create_Account",LR_AUTO);

	lr_start_transaction("Order_payment");

	web_add_auto_header("Origin", 
		"http://localhost:8080");

	web_add_auto_header("SOAPAction", 
		"com.advantage.online.store.accountserviceAddSafePayMethodRequest");

	web_add_auto_header("X-Requested-With", 
		"XMLHttpRequest");

	lr_think_time(79);

	web_custom_request("AddSafePayMethodRequest", 
		"URL=http://localhost:8080//accountservice/ws/AddSafePayMethodRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t29.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><AddSafePayMethodRequest xmlns=\"com.advantage.online.store.accountservice\"><safePayUsername>Filorian</safePayUsername><accountId>283991119</accountId><safePayPassword>Filo!@#123</safePayPassword><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></"
		"AddSafePayMethodRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_custom_request("AddSafePayMethodRequest_2", 
		"URL=http://localhost:8080//accountservice/ws/AddSafePayMethodRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t30.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><AddSafePayMethodRequest xmlns=\"com.advantage.online.store.accountservice\"><safePayUsername>Filorian</safePayUsername><accountId>283991119</accountId><safePayPassword>Filo!@#123</safePayPassword><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></"
		"AddSafePayMethodRequest></soap:Body></soap:Envelope>", 
		LAST);

	web_revert_auto_header("SOAPAction");

	web_revert_auto_header("X-Requested-With");

	web_custom_request("283991119_4", 
		"URL=http://localhost:8080/order/api/v1/orders/users/283991119", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t31.inf", 
		"Mode=HTML", 
		"EncType=application/json", 
		"Body={\"orderPaymentInformation\":{\"Transaction_AccountNumber\":\"843200971\",\"Transaction_Currency\":\"USD\",\"Transaction_CustomerPhone\":52365623,\"Transaction_MasterCredit_CVVNumber\":\"\",\"Transaction_MasterCredit_CardNumber\":\"4886\",\"Transaction_MasterCredit_CustomerName\":\"\",\"Transaction_MasterCredit_ExpirationDate\":\"122027\",\"Transaction_PaymentMethod\":\"SafePay\",\"Transaction_ReferenceNumber\":0,\"Transaction_SafePay_Password\":\"Filo!@#123\",\"Transaction_SafePay_UserName\""
		":\"Filorian\",\"Transaction_TransactionDate\":\"24122023\",\"Transaction_Type\":\"PAYMENT\"},\"orderShippingInformation\":{\"Shipping_Address_Address\":\"Kosovo\",\"Shipping_Address_City\":\"Kosovo\",\"Shipping_Address_CountryCode\":40,\"Shipping_Address_CustomerName\":\"Filo Filo\",\"Shipping_Address_CustomerPhone\":52365623,\"Shipping_Address_PostalCode\":\"Serbia\",\"Shipping_Address_State\":\"Serbia\",\"Shipping_Cost\":1799,\"Shipping_NumberOfProducts\":1,\"Shipping_TrackingNumber\":0},\""
		"purchasedProducts\":[{\"hexColor\":\"414141\",\"productId\":8,\"quantity\":1,\"hasWarranty\":false}]}", 
		LAST);

	web_custom_request("283991119_5", 
		"URL=http://localhost:8080/order/api/v1/carts/283991119", 
		"Method=DELETE", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t32.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Order_payment",LR_AUTO);
	
	lr_start_transaction("Go_Tocheck");

	web_revert_auto_header("Origin");

	lr_think_time(25);

	web_url("283991119_6", 
		"URL=http://localhost:8080/order/api/v1/orders/history/lines/users/283991119", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=application/json", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t33.inf", 
		"Mode=HTML", 
		LAST);

	web_url("MyOrders-page.html", 
		"URL=http://localhost:8080/app/account/views/MyOrders-page.html", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/html", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t34.inf", 
		"Mode=HTML", 
		LAST);

	lr_end_transaction("Go_Tocheck",LR_AUTO);

	lr_start_transaction("Sign_out");

	web_add_header("Origin", 
		"http://localhost:8080");

	web_add_header("SOAPAction", 
		"com.advantage.online.store.accountserviceAccountLogoutRequest");

	web_add_header("X-Requested-With", 
		"XMLHttpRequest");

	lr_think_time(40);

	web_custom_request("AccountLogoutRequest", 
		"URL=http://localhost:8080//accountservice/ws/AccountLogoutRequest", 
		"Method=POST", 
		"TargetFrame=", 
		"Resource=0", 
		"RecContentType=text/xml", 
		"Referer=http://localhost:8080/", 
		"Snapshot=t35.inf", 
		"Mode=HTML", 
		"EncType=text/xml; charset=UTF-8", 
		"Body=<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body><AccountLogoutRequest xmlns=\"com.advantage.online.store.accountservice\"><loginUser>283991119</loginUser><base64Token>Basic Rmlsb3JpYTpGaWxvIUAjMTIz</base64Token></AccountLogoutRequest></soap:Body></soap:Envelope>", 
		LAST);

	lr_end_transaction("Sign_out",LR_AUTO);

	return 0;
}