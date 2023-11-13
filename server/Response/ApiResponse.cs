namespace server.Response;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? ErrorCode { get; set; }
    public T? Payload { get; set; }
}
