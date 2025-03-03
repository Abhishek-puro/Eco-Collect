import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function Receipt({ orderDetails, onClose }) {
  const receiptContentRef = useRef(null)
 const logoUrl = "/ecocollectlogo.png"

  const handleDownload = async () => {
    const receiptElement = receiptContentRef.current
    if (!receiptElement) return alert("Receipt content not found!")

    try {
      const canvas = await html2canvas(receiptElement, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
    const img = new Image()
    img.src = logoUrl
    
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight)
      pdf.save("EcoCollect_Receipt.pdf")
    } catch (error) {
      console.error("PDF Generation Error:", error)
      alert("Failed to download receipt. Please try again.")
    }
  }

  if (!orderDetails) {
    return (
      <Card className="w-full max-w-md mx-auto p-4 bg-white text-center">
        <CardHeader>
          <CardTitle className="text-center">EcoCollect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 font-bold">No order details available!</p>
          <Button onClick={onClose} variant="outline" className="mt-4">
            Close
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4 bg-white">
      {/* Receipt Content */}
      <div ref={receiptContentRef}>
        <CardHeader>
          <CardTitle className="text-center">EcoCollect</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Order Receipt</h2>
          <div className="space-y-2">
            <p><strong>Date:</strong> {orderDetails?.orderDate ? new Date(orderDetails.orderDate).toLocaleString() : "N/A"}</p>
            <p><strong>Customer Name:</strong> {orderDetails?.name || "N/A"}</p>
            <p><strong>Phone:</strong> {orderDetails?.phone || "N/A"}</p>
            <p><strong>Address:</strong> {orderDetails?.address || "N/A"}</p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {orderDetails?.paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}
            </p>
          </div>

          {/* Order Items Table */}
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Item</th>
                <th className="text-center py-2 px-2">Quantity</th>
                <th className="text-right py-2 px-2">Price</th>
                <th className="text-right py-2 px-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-2">{orderDetails?.productName || "N/A"}</td>
                <td className="text-center py-2 px-2">{orderDetails?.quantity || 0}</td>
                <td className="text-right py-2 px-2">₹{orderDetails?.unitPrice?.toFixed(2) || "0.00"}</td>
                <td className="text-right py-2 px-2">₹{orderDetails?.totalAmount?.toFixed(2) || "0.00"}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right font-bold py-2 px-2">Total:</td>
                <td className="text-right font-bold py-2 px-2">₹{orderDetails?.totalAmount?.toFixed(2) || "0.00"}</td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </div>

      {/* Buttons */}
      <CardContent className="mt-6 flex justify-between">
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Receipt
        </Button>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </CardContent>
    </Card>
  )
}
