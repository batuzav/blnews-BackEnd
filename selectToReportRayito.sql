SELECT tbl_Orders_Header.LegacyNumber, tbl_Orders_Header.OrderType, OrderSource.OrderSourceName AS Order_Type, tbl_Addresses.Address AS SHIP_ADDRESS, tbl_Addresses.Address2 AS SJIP_ADDRESS_2, tbl_Addresses.city AS SHIP_CITY, tbl_Addresses.County AS SHIP_STATE_PROVINCE, tbl_Addresses.Zip AS SHIP_POSTALCODE, tbl_Orders_Header.CityTaxes, tbl_Markets.MarketName, tbl_Orders_Detail.itemName AS 'DESCRIPTION', tbl_Orders_Detail.Quantity AS PRODUCT_QUANTUTY ,tbl_Orders_Detail.UnitPrice AS PRODUCT_NUMBER, tbl_Orders_Header.OrderDate 
      FROM tbl_Orders_Detail
      JOIN tbl_Orders_Header ON tbl_Orders_Detail.OrderID = tbl_Orders_Header.ID
      JOIN tbl_Markets ON tbl_Orders_Header.MarketID = tbl_Markets.ID
      JOIN OrderSource ON tbl_Orders_Header.OrderSource  = OrderSource.OrderSourceId
      JOIN tbl_Addresses ON tbl_Orders_Header.ShippingAddressID = tbl_Addresses.Id
      WHERE tbl_Markets.ID=7 AND tbl_Orders_Header.OrderDate BETWEEN '2020-10-26' AND '2020-10-30'
      




      QtyShipped